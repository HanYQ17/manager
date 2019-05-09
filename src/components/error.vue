<template>
    <img src="../assets/404.png" alt="">
</template>

<script>
export default {
    created() {
        // 友情提示
        this.$message.error('你访问的页面不存在')
    },
}
</script>

<style>

</style>
