import Vue from "vue" //引入vue
import Vuex from "vuex"

Vue.use(Vuex)

const apiurl = 'https://api.wulv5.com/music'
export default new Vuex.Store({
	//全局变量
	state:{
		audio: uni.createInnerAudioContext(),
		//音乐详情
		detail: {},
		//歌词
		lrc:{},
		//历史记录
		history:[],
		//播放模式
		mode:1,
		//当前歌曲
		musicIndex: 0,
		paused: true //true 暂停 false 播放
	},
	//修改变量
	mutations:{
		setsrc(state, src) {
			state.audio.src = src;
			state.audio.play()
			state.paused = false
		},
		setlrc(state,lrc){
			state.lrc = lrc
		},
		setdetail(state, detail) {
			state.detail = detail
		},
		sethistory(state, data) {
			// src detail lrc
			// console.log(data)
			// 不存在是-1 存在对应的索引值
			var num = state.history.findIndex((item) => {
				return item.id === data[3]
			})
			// console.log(num)
			if (num === -1) {
				state.history.unshift({
					src: data[0],
					detail: data[1],
					lrc: data[2],
					id: data[3]
				})
			}
			
		},
		play(state) {
			// console.log(1)
			state.audio.play()
			state.paused = false
		},
		pause(state) {
			// console.log(2)
			state.audio.pause()
			state.paused = true
		},
		setindex(state, num) {
			state.musicIndex++
			// console.log(state.musicIndex, state.history.length - 1)
			if (state.musicIndex >= state.history.length) {
				state.musicIndex = 0
			}
		},
		setprev(state) {
			// 上一首
			if (state.musicIndex === 0) {
				state.musicIndex = state.history.length
			}
			if (state.musicIndex === -1) {
				 state.musicIndex = state.history.length -1
			}
			
			state.musicIndex--
		},
		chengemode(state) {
			state.mode++
			if (state.mode === 4) {
				state.mode = 1
			}
		}
	},
	// get music
	actions: {
		
		
		getsrc({commit, dispatch},item) {
			
			Promise.all([
				new Promise((next,err)=>{
					uni.request({
						url:apiurl + `/song/url?id=${item.id}`,
						success: res=>{
							commit("setsrc",res.data.data[0].url)
							next(res.data.data[0].url)
						}
					})
				}),
				new Promise((next, err) => {
					// 获取音乐的详情
					uni.request({
						url: apiurl + `/song/detail?ids=${item.id}`,
						success: (res) => {
							// console.log(res)
							commit('setdetail', res.data)
							next(res.data)
						}
					})
				}),
				new Promise((next,err)=>{
					uni.request({
						url:apiurl + `/lyric?id=${item.id}`,
						success: res=>{
							commit("setlrc", res.data)
							next(res.data)
						}
					})
				}),
			]).then((data)=>{
				data[3] = item.id
				commit('sethistory', data)
			})
			// 第一个参数是固定死的, 我们自己传的参数从第2个开始
// 			uni.request({
// 				url: apiurl + `/song/url?id=${item.id}`,
// 				success: (res) => {
// 					// console.log(res)
// 					commit('setsrc', res.data.data[0].url)
// 				}
// 			});
// 			// 获取音乐的详情
// 			uni.request({
// 				url: apiurl + `/song/detail?ids=${item.id}`,
// 				success: (res) => {
// 					// console.log(res)
// 					commit('setdetail', res.data)
// 				}
// 			}),
// 			//获取歌词
// 			uni.request({
// 				url:apiurl+`/lyric?id=${item.id}`,
// 				success: res=>{
// 					commit('setlrc', res.data.lrc.lyric)
// 					console.log(res)
// 				}
// 			})
		}
	}
}) 