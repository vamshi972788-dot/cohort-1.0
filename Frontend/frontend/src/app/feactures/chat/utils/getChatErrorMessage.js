function getChatErrorMessage(error, fallback) {
  return (
    error.response?.data?.message
    || error.response?.data?.Message
    || (error.response ? fallback : error.message)
    || fallback
  )
}

export default getChatErrorMessage
