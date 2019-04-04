<template>
	<view>
		<view class="uni-title">
			热门搜索
		</view>
		<view class="tag-view" v-for="(item, index) in hot" :key="index">
			<uni-tag circle="true" :text="item.first"></uni-tag>
		</view>
		<view class="uni-title">
			搜索历史记录
		</view>
		<view>
			<view class="tag-view" v-for="(item, index) in searchHistory" :key="index">
				<uni-tag circle="true" :text="item"></uni-tag>
			</view>
		</view>
		<view class="uni-title">
			搜索结果
		</view>
		<view>
			<!-- <uni-list>
				<uni-list-item
				 v-for="(item, index) in searchList" 
				 :key="index"
				 :title="item.name" note=""></uni-list-item>
			</uni-list> -->
			<view class="uni-list">
				<view class="uni-list-cell" v-for="(item, index) in searchList" 
					 :key="index">
					<view class="uni-media-list">
						<view class="uni-media-list-body">
							<view class="uni-media-list-body-top">{{ item.name }}</view>
							<view class="uni-media-list-body-bottom uni-ellipsis">{{ item.artists[0].name }}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <ul>
				<li>
					{{ item.name }}  {{ item.artists[0].name }}
				</li>
			</ul> -->
		</view>
	</view>
</template>

<script>
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components:{
			uniTag,
			uniList,
			uniListItem
		},
		data(){
			return {
				hot: [],
				searchList: [],
				searchHistory: []
			}
		},
		mounted(){
			uni.request({
				url: "https://api.wulv5.com/music/search/hot",
				success: (res)=>{
					this.hot = res.data.result.hots
				}
			})
		},
		onNavigationBarSearchInputConfirmed(e){
			this.searchHistory.push(e.text)
			uni.request({
				url: `https://api.wulv5.com/music/search?keywords=${e.text}`,
				success: (res) => {
					this.searchList = res.data.result.songs
					
				}
			})
		}
	}
</script>

<style>
	.tag-view{
		display: inline-block;
		margin: 10upx 15upx;
	}
</style>
