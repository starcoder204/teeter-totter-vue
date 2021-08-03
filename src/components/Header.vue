<template>
    <header class="header">
        <div class="header__container">
            <div class="header__pauseButton"
                 @click="togglePause"
                 @key.enter="togglePause">
                <font-awesome-icon :icon="pauseButton"></font-awesome-icon>
            </div>
        </div>
    </header>
</template>

<script>
    import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
    import { mapMutations, mapState } from 'vuex'
    import { TOGGLE_PAUSE } from '@/config'

    export default {
        name: 'Header',
        computed: {
            ...mapState({
                isPaused: state => state.isPaused
            }),
            pauseButton() {
                return this.isPaused ? faPlay : faPause
            }
        },
        methods: {
            ...mapMutations({
                togglePause: TOGGLE_PAUSE
            }),
            onKeyDown(ev) {
                if (ev.keyCode === 13) this.togglePause()
            }
        },
        beforeMount() {
            window.addEventListener('keydown', this.onKeyDown)
        },
        beforeDestroy() {
            window.removeEventListener('keydown', this.onKeyDown)
        }
    }
</script>

<style scoped lang="scss">
    $primary-color: #69F0AE;
    $secondary-color: #263238;

    .header {
        width: 100%;
        background-color: $primary-color;
        color: $secondary-color;
    }

    .header__container {
        width: 80%;
        margin: 0 auto;
    }

    .header__pauseButton {
        width: 20%;
        cursor: pointer;
        font-size: 2rem;
        line-height: 2rem;
        padding: 1rem 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color 0.4s ease-in-out;

        &:hover {
            background-color: lighten($primary-color, 10%);
        }
    }

</style>
