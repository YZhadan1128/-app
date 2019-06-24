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
			<view class="icon" @click.stop=" paused ? play() : pause() ">
				<cmd-icon :type=" paused ? 'play':'pause' " size="28" color="#654321"></cmd-icon>
				<view @click.stop="chengemode">
					{{ mode === 1 && '单曲' || mode === 2 && '顺序' || mode === 3 && '随机' }}
				</view>
				<view @click.stop="download">
					<cmd-icon type="download-cloud" size="30" color="#654321"></cmd-icon>
				</view>
				<view @click.stop="next">
					下一首
				</view>
				<view @click.stop="prev">
					上一首
				</view>
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
			...Vuex.mapState(['detail', 'paused','mode', 'audio', 'history', 'musicIndex'])
		},
		methods: {
			...Vuex.mapMutations(['play', 'pause','chengemode', 'setsrc', 'setdetail', 'setlrc', 'setindex', 'setprev']),
			toPlay() {
				uni.navigateTo({
					url: '/pages/music/music'
				})
			},
			download(){
				// downloadFile 相当于临时缓存
				uni.downloadFile({
					url: this.audio.src,
					success: (res) => {
						console.log(res)
						
						// 浏览器下载方式
						/* var a = document.createElement('a');
						a.href = res.tempFilePath;
						a.download = this.detail.songs[0].name + '.mp3'
						a.click() */
						
						// 手机app下载方式 永久保存
						uni.saveFile({
							tempFilePath: res.tempFilePath
						})
					}
				})
			},
			next() {
				this.setindex()
				this.setsrc(this.history[this.musicIndex].src)
				this.setdetail(this.history[this.musicIndex].detail)
				this.setlrc(this.history[this.musicIndex].lrc)
				
			},
			prev() {
				// console.log(this.musicIndex)
				this.setprev()
				this.setsrc(this.history[this.musicIndex].src)
				this.setdetail(this.history[this.musicIndex].detail)
				this.setlrc(this.history[this.musicIndex].lrc)
				
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
