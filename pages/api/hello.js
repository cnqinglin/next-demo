// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// 这是返回json格式的字符串的api
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
