import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './MusicPlayer.css'

// لإضافة موسيقى:
// حطي ملف الأغنية (mp3) في مجلد public/music وسميه our-song.mp3
// مفيش أي تعديل تاني مطلوب — هيتشغل تلقائي لو الملف موجود

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(35)
  const [songAvailable, setSongAvailable] = useState(true)
  const audioRef = useRef(null)

  const songSrc = '/music/our-song.mp3'

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !songSrc) return

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    audio.addEventListener('timeupdate', updateProgress)
    return () => audio.removeEventListener('timeupdate', updateProgress)
  }, [songSrc])

  // تشغيل الأغنية تلقائي أول ما الكومبوننت يظهر (يعني فورًا بعد إدخال الباسورد)
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // المتصفح ممكن يمنع التشغيل التلقائي في بعض الحالات،
        // فهنسيبها توقف وتشتغل لو هي دوست على الزرار بنفسها
        setIsPlaying(false)
      })
  }, [])

  const togglePlay = () => {
    if (!songAvailable) {
      // demo mode بدون موسيقى (الملف لسه مش موجود)
      setIsPlaying(!isPlaying)
      return
    }
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => setSongAvailable(false))
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <motion.div
      className="music-player"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <audio
        ref={audioRef}
        src={songSrc}
        loop
        onError={() => setSongAvailable(false)}
      />

      <button
        className={`play-disc ${isPlaying ? 'playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'إيقاف' : 'تشغيل'}
      >
        {isPlaying ? '❚❚' : '▶'}
      </button>

      <div className="player-info">
        <div className="player-top">
          <span className="song-title">أغنيتنا <span className="song-heart">♥</span></span>
          <span className="player-status">
            {isPlaying ? 'يتم التشغيل الآن' : 'متوقفة'}
          </span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  )
}
