import Vue from 'vue'
import Vuex from 'vuex'
import {
    TOGGLE_PAUSE,
    ADD_RIGHT_SIDE_BLOCK,
    ADD_LEFT_SIDE_BLOCK,
    RESET_STATE,
    MAX_BENDING,
    MIN_BENDING,
    MAX_SIDES_DIFFERENCE,
    FALLING_BLOCKS_COUNT,
    FINISH_FALLING,
    START_NEW_GAME,
    INITIALIZE_FALLING_BLOCKS,
    ADD_FALLING_BLOCK,
    MOVE_RIGHT,
    MOVE_LEFT
} from '@/config'
import { generateRandomBlock } from '@/utility'

Vue.use(Vuex)

function getBlockPower(array) {
    return array.reduce((acc, item) => {
        return acc += item.weight * item.offset
    }, 0)
}

export default new Vuex.Store({
    state: {
        isPaused: true,
        leftSideBlocks: [],
        rightSideBlocks: [],
        fallingBlocks: []
    },
    getters: {
        leftSum(state) {
            return getBlockPower(state.leftSideBlocks)
        },
        rightSum(state) {
            return getBlockPower(state.rightSideBlocks)
        },
        swingBending(state, getters) {
            const {leftSum, rightSum} = getters

            if (!leftSum) return MAX_BENDING
            if (leftSum === rightSum) return 0
            return leftSum > rightSum ? (leftSum - rightSum) / leftSum * -100 : (rightSum - leftSum) / rightSum * 100
        },
        gameOverStatus(state, getters) {
            const {leftSum, rightSum, swingBending} = getters

            console.log(swingBending)
            console.log(Math.abs(leftSum - rightSum))
            return swingBending > MAX_BENDING || swingBending < MIN_BENDING || Math.abs(leftSum - rightSum) > MAX_SIDES_DIFFERENCE
        }
    },
    mutations: {
        [TOGGLE_PAUSE](state) {
            state.isPaused = !state.isPaused
        },
        [ADD_RIGHT_SIDE_BLOCK](state) {
            const randomBlock = generateRandomBlock()
            state.rightSideBlocks.push(randomBlock)
        },
        [ADD_LEFT_SIDE_BLOCK](state) {
            const block = state.fallingBlocks.shift()
            state.leftSideBlocks.push(block)
        },
        [INITIALIZE_FALLING_BLOCKS](state){
            state.fallingBlocks = []
            for(let i = 0; i < FALLING_BLOCKS_COUNT; i++){
                const randomBlock = generateRandomBlock()
                state.fallingBlocks.push(randomBlock)
            }
        },
        [ADD_FALLING_BLOCK](state){
            const randomBlock = generateRandomBlock()
            state.fallingBlocks.push(randomBlock)
        },
        [MOVE_RIGHT](state){
            if (state.isPaused || state.fallingBlocks[0].offset - 1 <= 0) return
            state.fallingBlocks[0].offset -= 1
        },
        [MOVE_LEFT](state){
            if (state.isPaused || state.fallingBlocks[0].offset + 1 > 5) return
            state.fallingBlocks[0].offset += 1
        },
        [RESET_STATE](state) {
            state.isPaused = true
            state.leftSideBlocks = []
            state.rightSideBlocks = []
            state.fallingBlocks = []
        }
    },
    actions: {
        [FINISH_FALLING]({commit, state, getters, dispatch}) {

            commit(ADD_LEFT_SIDE_BLOCK)
            commit(ADD_FALLING_BLOCK)
            if (state.leftSideBlocks.length && state.leftSideBlocks.length !== state.rightSideBlocks.length)
                commit(ADD_RIGHT_SIDE_BLOCK)

            if (getters.gameOverStatus) setTimeout(() => {
                alert('game over')
                dispatch(START_NEW_GAME)
            }, 0)
        },
        [START_NEW_GAME]({commit}){
            commit(RESET_STATE)
            commit(ADD_RIGHT_SIDE_BLOCK)
            commit(INITIALIZE_FALLING_BLOCKS)
        }
    },
    strict: process.env.NODE_ENV !== 'production'
})
