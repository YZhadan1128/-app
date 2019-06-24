<template>
	<view>
		<ul>
			<li v-for="(item,i) in history" :key="i" @click="play(item)">
				{{item.detail.songs[0].name}}--{{item.detail.songs[0].ar[0].name}}
			</li>
		</ul>
	</view>
</template>

<script>
	import Vuex from 'vuex'
	export default {
		computed:{
			...Vuex.mapState(['history'])
		},
		methods:{
			...Vuex.mapMutations(['setsrc','setlrc','setdetail']),
			play(val){
				this.setsrc(val.src)
				this.setlrc(val.lrc)
				this.setdetail(val.detail)
			}
		}
	}
</script>

<style>
	ul,li{
		list-style: none;
	}
	li{
		line-height: 50upx;
		font-size: 18upx;
		color: #949494;
	}
</style>
