import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import './VideoGallerySection.css'

// عشان تضيفي الفيديوهات: حطي الـ 12 فيديو في مجلد public/videos
// وسميهم بالظبط: video1.mp4, video2.mp4 ... لحد video12.mp4
// مفيش أي تعديل تاني مطلوب في الكود — الموقع هياخدهم تلقائي بنفس الترتيب

const captions = [
  'ده كان أحلى يوم لينا مع بعض ❤️',
  'ده كان أول مرة نخش سينما مع بعض 🎬',
  'كانت مفرهدة بعد ما خرجت من اسكندرية 😅',
  'المكالمة اللي فضلنا فيها لحد الفجر من غير ما نحس بالوقت 📞',
  'يوم ضحكنا فيه لحد ما دمعنا من كتر الضحك 😂',
  'أول رحلة سفرنا فيها مع بعض ✈️',
  'بعد أي زعل، كنا برضو بنرجع لبعض أقوى من الأول',
  'لما فاجأتك وانتي مصدقتيش إن ده بيحصل 😍',
  'يوم قعدنا فيه مع بعض وكل حاجة كانت هادية وحلوة',
  'أوقات بسيطة وعادية، بس هي من أحلى ذكرياتي معاكي',
  'كل خطوة بنمشيها سوا بتقربنا من بعض أكتر ♥',
  'وعيد ميلادك النهاردة يا روجي.. وربنا يخليكي ليا 👑❤️',
]

function GalleryVideo({ id, caption, index }) {
  const [failed, setFailed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)

  const handleToggle = () => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch(() => setFailed(true))
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="video-placeholder">
      {!failed ? (
        <>
          <video
            ref={videoRef}
            src={`/videos/video${id}.mp4`}
            playsInline
            onError={() => setFailed(true)}
            onEnded={() => setIsPlaying(false)}
            onClick={handleToggle}
          />
          <button
            className={`video-play-toggle ${isPlaying ? 'is-playing' : ''}`}
            onClick={handleToggle}
            aria-label={isPlaying ? 'إيقاف' : 'تشغيل'}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>
        </>
      ) : (
        <span className="video-placeholder-icon">🎥</span>
      )}
      <span className="video-number">{index + 1}</span>
    </div>
  )
}

export default function VideoGallerySection() {
  const videos = captions.map((caption, i) => ({
    id: i + 1,
    caption,
  }))

  return (
    <section className="video-gallery-section" id="videos">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="section-tag">هدية عيد ميلادك 👑</span>
        <h2 className="section-title">12 فيديو من أحلى لحظاتنا</h2>
        <p className="section-subtitle">كل فيديو بيحكي حاجة عشناها مع بعض ♥</p>
      </motion.div>

      <div className="video-gallery-grid">
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            className="video-gallery-card"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <GalleryVideo {...video} index={i} />
            <div className="video-caption">{video.caption}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
