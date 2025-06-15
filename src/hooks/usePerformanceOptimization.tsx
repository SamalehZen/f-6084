
import { useEffect, useState } from 'react'

// Hook pour le lazy loading des images
export const useLazyLoading = () => {
  useEffect(() => {
    const images = document.querySelectorAll('img[data-lazy]')
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.lazy || ''
          img.classList.remove('lazy')
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach(img => imageObserver.observe(img))

    return () => {
      images.forEach(img => imageObserver.unobserve(img))
    }
  }, [])
}

// Hook pour le prefetching
export const usePrefetch = (urls: string[]) => {
  useEffect(() => {
    urls.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = url
      document.head.appendChild(link)
    })

    return () => {
      // Cleanup prefetch links
      urls.forEach(url => {
        const link = document.querySelector(`link[href="${url}"]`)
        if (link) {
          document.head.removeChild(link)
        }
      })
    }
  }, [urls])
}

// Hook pour le monitoring des performances
export const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState<{
    loadTime?: number
    renderTime?: number
    memoryUsage?: number
  }>({})

  useEffect(() => {
    // Mesurer le temps de chargement
    const loadTime = performance.now()
    
    // Mesurer l'utilisation mémoire si disponible
    const memoryInfo = (performance as any).memory
    const memoryUsage = memoryInfo ? memoryInfo.usedJSHeapSize / 1024 / 1024 : undefined

    setMetrics({
      loadTime,
      renderTime: performance.now() - loadTime,
      memoryUsage
    })

    // Log des métriques pour le debugging
    console.log('Performance Metrics:', {
      loadTime: `${loadTime.toFixed(2)}ms`,
      memoryUsage: memoryUsage ? `${memoryUsage.toFixed(2)}MB` : 'N/A'
    })

    // Envoyer les métriques à un service de monitoring (à implémenter)
    // sendMetricsToService(metrics)
  }, [])

  return metrics
}

// Hook pour optimiser les re-renders
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Hook principal qui combine toutes les optimisations
export const usePerformanceOptimization = () => {
  useLazyLoading()
  const metrics = usePerformanceMonitoring()
  
  return {
    metrics
  }
}
