<template>
	<view>
		<view class="banner">
			<image class="banner-img" :src="playlist.coverImgUrl"></image>
			
			<view class="banner-title">{{playlist.name}}</view>
			<view class="banner-description">{{playlist.description}}</view>
		</view>
		<view class="uni-list">
			<view @tap="getsrc(item)" class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in playlist.tracks" :key="index">
				<view class="uni-media-list">
					<image class="uni-media-list-logo" :src="item.al.picUrl"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{item.name}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{item.ar[0].name}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vuex from 'vuex'
	export default {
		data() {
			return {
				playlist: {}
			}
		},
		onLoad(params) {
			// console.log(params)
			uni.request({
				url: `https://api.wulv5.com/music/playlist/detail?id=${params.id}`,
				success: (res) => {
					this.playlist = res.data.playlist
				}
			})
		},
		mounted() {
			console.log(this)
		},
		methods: {
			...Vuex.mapActions(['getsrc'])
		}
	}
</script>

<style>
	.banner {
		height: 360upx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}
	.banner-img {
		width: 100%;
		filter: blur(70px);
	}
	.banner-title {
		max-height: 84upx;
		overflow: hidden;
		position: absolute;
		top: 50upx;
		
		width: 90%;
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		color: white;
		z-index: 11;
	}
	.banner-description {
		position: absolute;
		bottom: 32upx;
		overflow: hidden;
		max-height: 87upx;
	}
</style>
