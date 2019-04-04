<template>
	<view>
		<view @click="toPlay" class="page-body" v-if="detail.songs">
			<view>
				<img :src="detail.songs[0].al.picUrl + '?param=90y90'" alt="">
			</view>
			<view class="name">
				<!-- 歌曲名称 -->
				<p>{{ detail.songs[0].name }}</p>
				<!-- 歌手名称 -->
				<p>{{ detail.songs[0].ar[0].name }}</p>
			</view>
			<view class="icon" @click.stop="paused ? play() : pause()">
				<cmd-icon :type=" paused?'play':'pause' " size="28" color="#654321"></cmd-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import Vuex from 'vuex'
	import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
	export default {
		components: {cmdIcon},
		computed: {
			...Vuex.mapState(['detail', 'paused'])
		},
		methods: {
			...Vuex.mapMutations(['play', 'pause']),
			toPlay() {
				uni.navigateTo({
					url: '/pages/music/music'
				})
			}
		}
	}
</script>

<style>
	.page-body{
		position: fixed;
		bottom: 0;
		padding: 13upx 10upx;
		width: 100%;
		background-color: rgba(255,255,255,.8)
	}
	.page-body img{
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}
	.page-body view{
		float: left;
	}
	.page-body .name{
		padding-left: 15upx;
	}
	.page-body .icon{
		float: right;
		padding: 12upx 35upx 0 0;
	}
	.page-body .icon cmd-icon{
		color: #bebebe;
	}
</style>
