<template>
	<view>
		<ul>
			<li v-for="(item, i) in list" :key="i">{{ item.filePath }}</li>
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		mounted() {
			uni.getSavedFileList({
				success: (res) => {
					console.log(JSON.stringify(res))
					this.list = res.fileList
				}
			})
		}
	}
</script>

<style>
</style>
