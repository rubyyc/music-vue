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
// 周杰伦的晴天 songmid = 0039MnYb0qxYhV https://api.qq.jsososo.com/song/urls?id=0039MnYb0qxYhV

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
