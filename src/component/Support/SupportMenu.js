import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function SupportMenu() {
  //   useEffect(() => {
  //     let url = window.location.href.split("/");
  //     let target = url[url.length - 1].toLowerCase();
  //     let element = document.getElementById(target);
  //     element && element.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }, []);

  return (
    <div>
      <ul>
        <li>
          <Link
            to="/support#top-title"
            onClick={() => {
              let topTitle = document.getElementById("top-title");
              topTitle &&
                topTitle.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Top Title
          </Link>
        </li>
        <li>
          <Link
            to="/support#section-a"
            onClick={() => {
              let sectionA = document.getElementById("section-a");
              sectionA &&
                sectionA.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Section A
          </Link>
        </li>
        <li>
          <Link
            to="/support#section-b"
            onClick={() => {
              let sectionB = document.getElementById("section-b");
              sectionB &&
                sectionB.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Section B
          </Link>
        </li>
        <li>
          <Link
            to="/support#section-c"
            onClick={() => {
              let sectionC = document.getElementById("section-c");
              sectionC &&
                sectionC.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Section C
          </Link>
        </li>
      </ul>
    </div>
  );
}
