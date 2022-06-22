import { useEffect, useState } from "react";

export default function useMdImport(filePath) {
  const [post, setPost] = useState();
  useEffect(() => {
    const setTheText = async () => {
      const fileName = "supportText";
      const file = await import(`${filePath}`);
      const response = await fetch(file.default);
      const text = await response.text();
      setPost(text);
    };
    setTheText();
  }, []);
  return post;
}
