import Vue from "vue" //引入vue
import Vuex from "vuex"

Vue.use(Vuex)

const apiurl = 'https://api.wulv5.com/music'
export default new Vuex.Store({
	//全局变量
	state:{
		audio: uni.createInnerAudioContext(),
		detail: {},
		paused: true //true 暂停 false 播放
	},
	//修改变量
	mutations:{
		setsrc(state, src) {
			state.audio.src = src;
			state.audio.play()
			state.paused = false
		},
		setdetail(state, detail) {
			state.detail = detail
		},
		play(state) {
			// console.log(1)
			state.audio.play()
			state.paused = false
		},
		paused(state) {
			// console.log(2)
			state.audio.pause()
			state.paused = true
		}
	},
	// get music
	actions: {
		getsrc({commit, dispatch},item) {
			// 第一个参数是固定死的, 我们自己传的参数从第2个开始
			uni.request({
				url: apiurl + `/song/url?id=${item.id}`,
				success: (res) => {
					// console.log(res)
					commit('setsrc', res.data.data[0].url)
				}
			});
			// 获取音乐的详情
			uni.request({
				url: apiurl + `/song/detail?ids=${item.id}`,
				success: (res) => {
					// console.log(res)
					commit('setdetail', res.data)
				}
			})
		}
	}
}) 