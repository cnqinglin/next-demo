import path from 'path';
import fs, {promises as fsPromise} from 'fs';
const matter = require('gray-matter');

const markdownDir = path.join(process.cwd(), 'markdown')

const getPosts = async () => {
    
    const fileNames = await fs.promises.readdir(markdownDir)
    const x = fileNames.map((fileName) => {
        const fullPath = path.join(markdownDir, fileName)
        const id = fileName.replace(/\.md$/g,'')

        const text = fs.readFileSync(fullPath, 'utf-8')
        const { data: { title, date }, content } = matter(text)

        return { id, title, date}
    })
    return fileNames
}

export default getPosts

export const getPost = async (id: string) => {
    const fullPath = path.join(markdownDir, id + '.md');
    const text = fs.readFileSync(fullPath, 'utf-8');
    const {data: {title, date}, content} = matter(text);
    // const htmlContent = marked(content);
    return JSON.parse(JSON.stringify({
        id, title, date, content,
        // htmlContent
    }));
  };
  
  
  export const getPostIds = async () => {
    const fileNames = await fsPromise.readdir(markdownDir);
    return fileNames.map(fileName => fileName.replace(/\.md$/g, ''));
  };