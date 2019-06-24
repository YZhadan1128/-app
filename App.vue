<script>
	import Vuex from 'vuex'
	export default {
		onLaunch: function () {
			console.log('App Launch')
			this.audio.onEnded(()=>{
				if(this.mode===1){
					//单曲循环
					this.play()
				}else if(this.mode === 2) {
					// 顺序播放
					// 所有歌曲都是保存在历史记录
					this.setindex()
					this.setsrc(this.history[this.musicIndex].src)
					this.setdetail(this.history[this.musicIndex].detail)
					this.setlrc(this.history[this.musicIndex].lrc)
				} else if (this.mode === 3) {
					const index = Math.floor(Math.random() * this.history.length)
					this.setsrc(this.history[index].src)
					this.setdetail(this.history[index].detail)
					this.setlrc(this.history[index].lrc)
				}
			})
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		},
		computed:{
			...Vuex.mapState(['audio','mode','musicIndex','history'])
		},
		methods:{
			...Vuex.mapMutations(['play','setdetail','setlrc','setindex'])
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
	.uni-title {
		font-weight: bold;
		font-size: 35upx;
		padding-left: 50upx;
	}
	.swiper{
		margin-top: 20upx;
	}
	
</style>
