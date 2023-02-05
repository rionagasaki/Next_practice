import type { NextPage, GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { StringLiteral } from "typescript";

const catImages: string[] = [
    "https://cdn2.thecatapi.com/images/bpc.jpg",
    "https://cdn2.thecatapi.com/images/eac.jpg",
    "https://cdn2.thecatapi.com/images/6qi.jpg",
]

interface CatCategory {
    id: number,
    name: string
}

interface SearchCatImage {
    breeds: string[]
    categories: CatCategory[];
    id: string;
    url: string;
    width: number;
    height: number;
}

type SearchCatImageResponse = SearchCatImage[];

interface IndexPageProps {
    initialCatImageUrl: string;
}

 const fetchCatImage = async ():Promise<SearchCatImage> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const result = (await res.json()) as SearchCatImageResponse;
    return result[0]
 };


const IndexPage: NextPage<IndexPageProps> = (props) => {
    const { initialCatImageUrl } = props
    
    
    const handleClick = async () => {
       const image = await fetchCatImage();
       setCatImageUrl(image.url)
    };

    fetchCatImage().then((image)=>{
        console.log(image.url)
     });
        
  const [catImageUrl, setCatImageUrl] = useState<string | undefined>(initialCatImageUrl);

  return (
    <div>
        <button onClick={handleClick}>今日のにゃんこ🐱</button>
        <img src={catImageUrl} alt="ねこ" />
    </div>
  )
};

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
    const catImage = await fetchCatImage();
    return {
        props: {
            initialCatImageUrl: catImage.url
        }
    }
}
export default IndexPage;