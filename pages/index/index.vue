<template>
	<view class="content">
        <!--swiper-->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" style="text-align: center">
			<swiper-item v-for="(item,index) in banner" :key="index">
				<view class="swiper-item">
					<image :src="item.imageUrl" mode="widthFix"></image>
				</view>
			</swiper-item>
		</swiper>
		
		<view class="uni-title">
			推荐歌单
		</view>
		<view class="uni-product-list">
			<view @click="playlist(item)" class="uni-product" v-for="(item,index) in list" :key="index">
				<view class="image-view">
					<image class="uni-product-image" :src="item.picUrl"></image>
					<p class="uni-product-title">{{item.name}}</p>
				</view>
			</view>
		</view>
		<view class="uni-title">
			新碟推荐
		</view>
		<view class="uni-product-list new">
			<view class="uni-product" v-for="(item,index) in newlist" :key="index">
				<view class="image-view">
					<image class="uni-product-image" :src="item.picUrl"></image>
					<p class="uni-product-title">{{item.name}}</p>
				</view>
				
			</view>
		</view>
		<view class="uni-title">
			LOOK直播
		</view>
		<view class="uni-product-list look">
			不好意思这个东西少儿不宜
		</view>
		<view class="uni-title">
			会员专区
		</view>
		<view class="uni-product-list look">
			嘻嘻这个没有接口,大家用这个都是会员
		</view>
		<view class="uni-title">
			推荐电台
		</view>
		<view class="uni-product-list">
			<view class="uni-product" v-for="(item,index) in station" :key="index">
				<view class="image-view">
					<image class="uni-product-image" :src="item.picUrl"></image>
					<p class="uni-product-title">{{item.name}}</p>
				</view>
			</view>
		</view>
		<view class="uni-title des">
			
			<p>感谢使用 author: YZhadan,github: <a href="https://github.com">YZhadan的github</a></p>
		</view>
		<view>
			<uni-drawer @close="closeDrawer" :visible="visible" mode="left">
				<view class="account">账户</view>
				<uni-list style="margin-top:150upx">
					<uni-list-item @click="history" title="历史记录" note="" show-arrow="false"></uni-list-item>
					<uni-list-item @click="download" title="下载中心" note="" show-arrow="false"></uni-list-item>
					<uni-list-item title="设置" note="" show-arrow="false"></uni-list-item>
					<uni-list-item title="夜间模式" note="" show-arrow="false"></uni-list-item>
					
					<uni-list-item title="加入yzd音乐人" note="" show-arrow="false"></uni-list-item>
					<uni-list-item title="分享yzd音乐" note="" show-arrow="false"></uni-list-item>
					<uni-list-item title="关于" note="" show-arrow="false"></uni-list-item>
				</uni-list>
			</uni-drawer>
		</view>
		
		<player></player>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import player from '@/components/player/player.vue'
	export default {
		components:{
			uniList,
			uniListItem,
			uniDrawer,
			player
		},
		data() {
			return {
				banner: [],
				list: [],
				newlist:[],
				station: [],
				visible: false
			}
		},
		onLoad() {
			//ajax 
			uni.request({
				url:"https://api.wulv5.com/music/banner",
				success:(res)=>{
					// console.log(res)
					this.banner = res.data.banners
				}
			})
			uni.request({
				url: "https://api.wulv5.com/music/personalized",
				success: (res)=>{
					// console.log(res)
					this.list = res.data.result
				}
			})
			uni.request({
				url: "https://api.wulv5.com/music/top/album",
				success: (res) => {
					// console.log(res)
					this.newlist = res.data.albums
				}
			})
			uni.request({
				url: "https://api.wulv5.com/music/personalized/djprogram",
				success: (res) => {
					// console.log(res)
					this.station = res.data.result
				}
			})
		},
		methods: {
			none(){
				uni.navigateTo({
					url: "/pages/search/search",
				})
			},
			menu(){
				this.visible = true
			},
			closeDrawer() {
				this.visible = false
			},
			history(){
				uni.navigateTo({
					url:"/pages/history/history"
				})
			},
			download(){
				uni.navigateTo({
					url:"/pages/download/download"
				})
			},
			playlist(item) {
				// console.log(item)
				uni.navigateTo({
					url: `/pages/playerdetail/playerdetail?id=${item.id}`
				})
				
			}
		},
		onNavigationBarButtonTap(e){
			//e.index===0 search
			//e.index===1 menu
			// console.log(e)
			this[e.type]()
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		
	}
</script>

<style>
	.swiper-item image{
		width: 80%;
		height: 85%;
	}
	.uni-product-list{
		display:flex;
		flex: row wrap;
		justify-content: center;
		align-content: space-between;
		padding-top: 10upx;
		height: 700upx;
		overflow:hidden;
		background: #eee;
	}
	.uni-product-list .uni-product{
		width: 25%;
	}
	.uni-product-list .uni-product .image-view{
		margin: 0;
	}
	.uni-product-list .uni-product image{
		width: 65%;
		height: 65%;
		border-radius: 10upx;
	}
	.uni-product-list .uni-product .uni-product-title{
		display: inline-block;
		width: 65%;
		font-size: 20upx;
	}
	.new{
		padding-top: 10upx;
		height: 350upx;
	}
	.look{
		height: 100upx;
	}
	.des{
		font-size: 16upx;
		text-align: center;
	}
	.des>p>a{
		color: #aaa;
		text-decoration: none;
	}
	.account{
		margin: 20upx;
	}
</style>
