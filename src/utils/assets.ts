const imgBaseUrl = (import.meta as any).env.VITE_IMG_BASEURL // 图片请求路径

function useImgAssets(filePath: string, { noCache = false } = {}) {
  // 去掉 filePath 前面的 @ 符号
  if (filePath.startsWith('@')) {
    filePath = 'src' + filePath.slice(1)
  }

  const fileUrl = `${imgBaseUrl}${filePath}`

  if (noCache) {
    return fileUrl + '?t=' + Date.now()
  } else {
    return fileUrl
  }
}

export const useAssets = useImgAssets

export default useImgAssets
