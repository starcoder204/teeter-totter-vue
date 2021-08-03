<template>
    <main class="gameArea">
        <Dropbox/>
        <TeetleTottle/>
    </main>
</template>

<script>
    import Dropbox from './Dropbox'
    import TeetleTottle from './TeetleTottle'

    export default {
        name: "GameArea",
        components:{
            Dropbox, TeetleTottle
        }
    }
</script>

<style lang="scss" scoped>
    .gameArea {
        width: 80%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        padding-top: 1rem;
    }
</style>