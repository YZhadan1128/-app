<template>
	<view class="musica">
		<view class="imgRotate">
			<view class="imgRotatea">
				<img :src="detail.songs[0].al.picUrl + '?param=180y180'" alt="">
			</view>
		</view>
		<view class="lrcs">
			<ul class="pad" :style=" 'margin-top: -' + 26*index + 'px; transition: margin 1.5s;paddingLeft:0' ">
				<li ref="li" :style="index === i && 'color:red;'" v-for="(item, i) in lrcarr" :key="i">
					{{ item.text }}
				</li>
			</ul>
		</view>
		<view class="slideree">
			<view>{{start}} </view>
			<!-- 导航条 -->
			<view class="slidere">
				<slider @change="change"  @changing="changing" :value='value' block-size='12' backgroundColor='#888888' activeColor='#ccc'/>
			</view>
			<view>{{total}}</view>
		</view>
		<player></player>
	</view>
	
</template>

<script>
	import Vuex from 'vuex'
	import player from '@/components/player/player.vue'
	export default {
		data() {
			return {
				start:'',
				total:'',
				value:0,
				undatestate:true,
				lrcarr:[],
				// 用来记录当前是第几条歌词
				index:-1,
				height: 0
			}
		},
		mounted(){
			console.log(this.detail)
			uni.setNavigationBarTitle({
				title:this.detail.songs[0].name
			})
			
			this.audio.onEnded(() => {
				this.index = -1
				uni.setNavigationBarTitle({
					title:this.detail.songs[0].name
				})
				this.geshihuageci()
			})
			this.audio.onPlay(() => {
				this.index = -1
				uni.setNavigationBarTitle({
					title:this.detail.songs[0].name
				})
				this.geshihuageci()
			})
			 
			this.geshihuageci()
			
			this.$nextTick(() => {
				this.height = this.$refs.li[5].offsetHeight
			})
			this.jindu()
			// 当音乐时间改变的事件
			this.audio.onTimeUpdate(this.jindu)
		},
		methods:{
			jindu(){
				// 当前播放时间
				let min = Math.floor(this.audio.currentTime / 60);
				min = min.toString().length === 1 ? ("0" + min): min;
				let sec = Math.round(this.audio.currentTime % 60);
				sec = sec.toString().length === 1 ? ("0" + sec): sec;
				// 总时间
				let zmin = Math.floor(this.audio.duration / 60);
				zmin = zmin.toString().length === 1 ? ("0" + zmin): zmin;
				let zsec = Math.round(this.audio.duration % 60);
				zsec = zsec.toString().length === 1 ? ("0" + zsec): zsec;
				
				this.start = `${min}:${sec}`
				this.total = `${zmin}:${zsec}`
				
				//播放进度的百分比
				// console.log(this.undatestate)
				if (this.undatestate) {
					// console.log(1)
					this.value = this.audio.currentTime / this.audio.duration * 100
				}
				
				// 改变歌词 当前播放时间和歌词时间比较 
				if(this.start > this.lrcarr[this.index + 1].time){
					this.index++
				}
				
			},
			// 当前播放的时间 改变进度条
			change(e){
				let t = e.detail.value * this.audio.duration / 100
				this.audio.seek(t)
				this.undatestate = true
				
				// 播放到了多长时间
				let min = Math.floor(t / 60);
				min = min.toString().length === 1 ? ("0" + min): min;
				let sec = Math.round(t % 60);
				sec = sec.toString().length === 1 ? ("0" + sec): sec;
				let s = `${min}:${sec}`
				
				const self = this;
				this.index = 0;
				function d(){
					// console.log(1)
					if (s > self.lrcarr[self.index + 1].time) {
						self.index++
						d()
					}
				}
				d()
			},
			// 正在拖动时
			changing(){
				this.undatestate =false;
			},
			geshihuageci() {
				//切割歌词
				const arr= this.lrc.lrc.lyric.split('\n')
				//console.log(arr)
				const lrcarr = []  //定义一个数组
				for (let i = 0; i < arr.length; i++) {
					let temparr = arr[i].split(']') //去掉后中括号
					//console.log(temparr)
					lrcarr.push({
						time:temparr[0].substring(1,temparr[0].length-1),
						text:temparr[1]
					})
				}
				//console.log(lrcarr)
				this.lrcarr = lrcarr
			}
		},
		computed:{
			...Vuex.mapState(['detail','audio','lrc'])
		},
		components:{
			player
		}
	}
</script>

<style>
	ul,li{
		list-style: none;
	}
	.slideree{
		display: flex;
		justify-content: center;
		align-items:center;
	}
	.slidere{
		width: 60%;
	}
	view.lrcs{
		/* style="height:30upx; overflow:auto; text-align:center;padding:360upx 80upx 40upx 0;" */
		text-align: center;
		overflow: hidden;
		height: 250upx;
		margin: 100upx auto 0;
		padding-top: 150upx;
		
		font-size: 25upx;
		color: #949494;
	}
	view.lrcs>li.pad{
		padding-left: 0;
	}
	li{
		list-style: none;
	}
	.musica{
		padding-top:70upx ;
	}
	.musica img{
		border-radius: 50%;
	}
	@-webkit-keyframes rotation{

    from {-webkit-transform: rotate(0deg);}

    to {-webkit-transform: rotate(360deg);}

	}
	.imgRotate{
			width: 360upx;
			height: 360upx;
			margin: 0 auto;
	}
	.imgRotate image{
		width: 360upx;
		height: 360upx;
		
	}
	.imgRotatea{
		-webkit-transform: rotate(360deg);
		
		animation: rotation 3s linear infinite;
		
		-moz-animation: rotation 3s linear infinite;
		
		-webkit-animation: rotation 3s linear infinite;
		
		-o-animation: rotation 3s linear infinite;
	}
</style>
