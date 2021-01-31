// import { getSongUrlBySongmid } from 'api/singer'
export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: 'http://isure.stream.qqmusic.qq.com/C400002202B43Cq4V4.m4a?guid=2796982635&vkey=9C0324FDEBE73F55EF982C12119FF5FE6A6812F9D1085237844F5560293CC87361D5AD55B69E1649A358108219C369D2463027691C84402E&uin=956581739&fromtag=66'
  })
}
// 周杰伦的晴天 songmid = 0039MnYb0qxYhV 'https://api.qq.jsososo.com/song/urls?id=0039MnYb0qxYhV'
// vkey的获取可参考这个https://www.cnblogs.com/hou-yuan-zhen/p/12316069.html

// https://api.qq.jsososo.com/song/urls?id=0039MnYb0qxYhV,004Z8Ihr0JIu5s,003cI52o4daJJL
// {
//   data: {
//   0039MnYb0qxYhV: "http://isure.stream.qqmusic.qq.com/C400002202B43Cq4V4.m4a?guid=2796982635&vkey=AC5E457D7CE07DDD826E4A70825EDFCF9A7C824DABF2478BDE6B0B5DDC509015AA1DA91C905C9182A1972C639483F72726FDE61D6B148C16&uin=956581739&fromtag=66",
//   004Z8Ihr0JIu5s: "http://isure.stream.qqmusic.qq.com/C4000012Ez0a1tFcOI.m4a?guid=2796982635&vkey=5C8DF308B47AD40899A18B10EAE0FD02AEF9DCD6565AD74AA5409F7BCFB13000003AF70EFCA319018CDA851BF1C0E64EEB748B3191244716&uin=956581739&fromtag=66",
//   003cI52o4daJJL: "http://isure.stream.qqmusic.qq.com/C400002zvyzm1EoNMq.m4a?guid=2796982635&vkey=531AE4928FA11372D8A8329944191457F9930D4270D0EA82255628EC4C8DC8094114599830E303DE99338FD9FE1ABCD7638AB5E8FBE1A6EE&uin=956581739&fromtag=66"
//   },
//   result: 100
//   }

// Flisten_count1: 0
// Fupload_time: "2005-10-24 11:11:35"
// index: 1
// isnew: 0
// listenCount: 0
// musicData:
// albumdesc: ""
// albumid: 8220
// albummid: "000MkMni19ClKG"
// albumname: "叶惠美"
// alertid: 41
// belongCD: 3
// cdIdx: 0
// interval: 269
// isonly: 1
// label: "4611686018435776513"
// msgid: 13
// pay:
// payalbum: 0
// payalbumprice: 0
// paydownload: 1
// payinfo: 1
// payplay: 1
// paytrackmouth: 1
// paytrackprice: 200
// timefree: 0
// __proto__: Object
// preview:
// trybegin: 84339
// tryend: 142856
// trysize: 960887
// __proto__: Object
// rate: 23
// singer: Array(1)
// 0:
// id: 4558
// mid: "0025NhlN2yWrP4"
// name: "周杰伦"
// __proto__: Object
// length: 1
// __proto__: Array(0)
// size5_1: 0
// size128: 4317292
// size320: 10792516
// sizeape: 0
// sizeflac: 31430142
// sizeogg: 5864688
// songid: 97773
// songmid: "0039MnYb0qxYhV"
// songname: "晴天"
// songorig: "晴天"
// songtype: 0
// strMediaMid: "002202B43Cq4V4"
// stream: 13
// switch: 17405185
// type: 0
// vid: "w0026q7f01a"
// __proto__: Object
// playurl: ""
// price: 320
// vid:
// Fmv_id: "293791"
// Fstatus: "1"
// Fvid: "w0026q7f01a"

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

// function getSongUrl(songmid) {
//   getSongUrlBySongmid(songmid).then((res) => {
//     console.log('res.data', res)
//   })
// }
