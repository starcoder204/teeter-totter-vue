<template>
    <div class="root">
        <Header/>
        <GameArea/>
    </div>
</template>

<script>
    import Header from './components/Header'
    import GameArea from './components/GameArea'

    export default {
        name: 'app',
        components: {
            Header,
            GameArea
        }
    }
</script>

<style lang="scss" scoped>
    .root{
        overflow: hidden;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    body {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style: none;
    }
</style>
