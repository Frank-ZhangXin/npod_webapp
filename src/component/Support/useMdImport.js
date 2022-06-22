import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function useMdImport(filePath) {
  const [post, setPost] = useState();
  useEffect(() => {
    const setTheText = async () => {
      const file = await import(`${filePath}`);
      const response = await fetch(file.default);
      const text = await response.text();
      setPost(<ReactMarkdown children={text} />);
    };
    setTheText();
  }, []);
  return post;
}
