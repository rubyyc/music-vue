import axios from 'axios'
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
// import axios from 'axios'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 1664029744
  })

  return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    singermid: singerId,
    g_tk: 1664029744
  })
  return jsonp(url, data, options)
}
// 最新接口尝试
export function getSingerDetailByNewApi(singer) {
  console.log('singer....', singer)
  // const url = 'https://u.y.qq.com/cgi-bin/musics.fcg'
  const url = '/api/getSingerDetail'
  const params = `{"comm":{"ct":24,"cv":0},"singerSongList":{"method":"GetSingerSongList","param":{"order":1,"singerMid":"${singer.id}","begin":0,"num":10},"module":"musichall.song_list_server"}}`
  let str = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let count = Math.floor(Math.random() * 7 + 10)
  let sign = 'zza'
  for (let i = 0; i < count; i++) {
    sign += str[Math.floor(Math.random() * 36)]
  }
  sign += window.__sign_hash_20200305('CJBPACrRuNy7' + JSON.stringify(params))

  const data = Object.assign({}, commonParams, {
    '-': 'getSingerSong08727173005808453',
    g_tk: 5381,
    sign: sign,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: params
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })

  // console.log('singer...end...')

  // return jsonp(url, data, options)
}
// https://u.y.qq.com/cgi-bin/musics.fcg?-=getSingerSong08727173005808453&g_tk=5381&sign=zzai9pco83svye5wf6be8abd941f9f2b62c18f39dd6266e6&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%2C%22singerSongList%22%3A%7B%22method%22%3A%22GetSingerSongList%22%2C%22param%22%3A%7B%22order%22%3A1%2C%22singerMid%22%3A%220025NhlN2yWrP4%22%2C%22begin%22%3A0%2C%22num%22%3A10%7D%2C%22module%22%3A%22musichall.song_list_server%22%7D%7D

// 'https://u.y.qq.com/cgi-bin/musics.fcg?g_tk=5381&inCharset=utf8&outCharset=utf-8&notice=0&format=json&-=getSingerSong08727173005808453&sign=zzai9pco83svye5wf6be8abd941f9f2b62c18f39dd6266e6&loginUin=0&hostUin=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22:%7B%22ct%22:24,%22cv%22:0%7D,%22singerSongList%22:%7B%22method%22:%22GetSingerSongList%22,%22param%22:%7B%22order%22:1,%22singerMid%22:%220025NhlN2yWrP4%22,%22begin%22:0,%22num%22:20%7D,%22module%22:%22musichall.song_list_server%22%7D%7D'