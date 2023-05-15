import React, {useState, useEffect, useCallback, useMemo} from "react"
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles"
import {IoMdResize} from "react-icons/io"
import {marked} from "marked";
import "../styles/index.css"
       
                     

const App = () => {
    const [text, setText] = useState([]);
    const [inputText, setInputText] = useState(`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
    
Heres some code, \`<div></div>\`, between 2 backticks.
    
\`\`\`
// this is multi-line code:
    
function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
    }
}
\`\`\`
    
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.
    
There's also [links](https://www.freecodecamp.org), and
> Block Quotes!
    
And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.
    
- And of course there are lists.
    - Some are bulleted.
        - With different indentation levels.
        - That look like this.
    
    
1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:
    
![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`);  
    const [buttonPreview, setButtonPreview] = useState(false);
    const [buttonEditor, setButtonEditor] = useState(false);

    let particlesInit = useCallback( async engine => {
        console.log(engine);

        await loadFull(engine);
    }, [])

    let particlesLoaded = useCallback( async container => {
        await console.log(container);
    }, [])

    let options = useMemo(()=>{
        return {
            background: {
                color: "#162726"
            },
            fullscreen: {
                enable: true,
                zIndex: -1
            },
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push"
                    } 
                }, 
                modes: {
                    push: { quantity: 20 },
                    remove: {
                        quantity: 15
                    }
                }
            },
            particles: {
                links: {
                    enable: true,
                    distance: 68,
                },
                move: {
                    enable: true,
                    speed: {min: 1, max: 3}
                },
                opacity: {
                    value: {min: 0.2, max:0.8}
                },
                size: {
                    value: {min: 1, max:2.5}},
                reduceDuplicates:{
                    enable: true
                },
                number: {
                    limit: 120
                },
                destroy: {
                    enable: true
                }

            },
            fpsLimit: 40
        }
    }, [])

    useEffect(
        () => {
            //función para identificar el texto
            let lineBreakRegex = /(\r\n|\n|\r)/gm;

            //console.log(inputText.match(/.*/))
            let lineText  = inputText.split(lineBreakRegex);

            //console.log(lineText);

        // -------------------- SECOND TRY FUNCTION -------------
            const convertText = (item) => {
                let textReturn; 
                

                // ------------------------- PÁRRAFOS ----------------------
                const paragraph = (text) => {
                    let after, componente, before;
                    if(/^(\r\n|\n|\r)?```(\r\n|\n|\r)+.*(\r\n|\n|\r)+```(\r\n|\n|\r)?/sm.test(text) ){
                        before = /.*?(?=(\r\n|\n|\r)```(\r\n|\n|\r)+.*(\r\n|\n|\r)+```(\r\n|\n|\r)?)/sm.test(text) ? text.match(/.*?(?=(\r\n|\n|\r)```(\r\n|\n|\r)+.*(\r\n|\n|\r)+```(\r\n|\n|\r)?)/sm) : null;
                        after = /(?<=^(\r\n|\n|\r)?```(\r\n|\n|\r)+.*(\r\n|\n|\r)+```(\r\n|\n|\r)).*/sm.test(text) ? text.match(/(?<=^(\r\n|\n|\r)?```(\r\n|\n|\r).*(\r\n|\n|\r)```(\r\n|\n|\r)).*/sm) : null;
                        componente = `<pre><code>${text.match(/(?<=^(\r\n|\n|\r)?```(\r\n|\n|\r)+).*(?=(\r\n|\n|\r)+```(\r\n|\n|\r)?)/ms)[0]}</code></pre>`;
                    } else if (text.match(/^(\r\n|\n|\r)?(###) /sm) != null) {
                        before = /.*?(?=(\r\n|\n|\r)(###).*(\r\n|\n|\r)?)/sm.test(text)? text.match(/.*?(?=(\r\n|\n|\r)(###).*(\r\n|\n|\r)?$)/sm) : null;
                        after = /(?<=^(\r\n|\n|\r)?(###).*(\r\n|\n|\r)).*/sm.test(text)? text.match(/(?<=^(\r\n|\n|\r)?(###).*(\r\n|\n|\r)).*/sm) : null; 
                        componente = `<h3>${text.match(/(?<=^((\r\n|\n|\r)?)(###) ).*(?=(\r\n|\n|\r)?)/m)[0]}</h3>`
                    }   
                    else if (text.match(/^(\r\n|\n|\r)?(##) /sm) != null ) {
                        before = /.*?(?=(\r\n|\n|\r)(##).*(\r\n|\n|\r)?)/sm.test(text)? text.match(/.*?(?=(\r\n|\n|\r)(##).*(\r\n|\n|\r)?$)/sm) : null;
                        after = /(?<=^(\r\n|\n|\r)?(##).*(\r\n|\n|\r)).*/sm.test(text)? text.match(/(?<=^(\r\n|\n|\r)?(##).*(\r\n|\n|\r)).*/sm) : null; 
                        componente = `<h2>${text.match(/(?<=^(\r\n|\n|\r)?(##) ).*(?=(\r\n|\n|\r)?)/m)[0]}</h2>`
                    }
                    else if (text.match(/^(\r\n|\n|\r)?(#) /sm) != null) {
                        before = /.*?(?=(\r\n|\n|\r)(#).*(\r\n|\n|\r)?)/sm.test(text)? text.match(/.*?(?=(\r\n|\n|\r)(#).*(\r\n|\n|\r)?$)/sm) : null;
                        after = /(?<=^(\r\n|\n|\r)?(#).*(\r\n|\n|\r)).*/sm.test(text)? text.match(/(?<=^(\r\n|\n|\r)?(#).*(\r\n|\n|\r)).*/sm) : null; 
                        componente = `<h1>${text.match(/(?<=^(\r\n|\n|\r)?(#) ).*(?=(\r\n|\n|\r)?)/m)[0]}</h1>`
                    }
                    else if (text.match(/^(\r\n|\n|\r)?#{1,3} /sm) == null){
                        
                        after = /(?<=^(\r\n|\n|\r)?.*(\r\n|\n|\r)).*/sm.test(text)? text.match(/(?<=^(\r\n|\n|\r)?.*(\r\n|\n|\r)).*/sm) : null;
                        componente = `<p>${text.match(/(?<=^(\r\n|\n|\r)?).*(?=(\r\n|\n|\r)*?)/m)[0]}</p>`
                    } 
            
                   
//  if(text.match(/``.+``/) != null){
//                         codeT = text.match(/(?<=``).+(?=``)/);
//                         console.log(`<code>${codeT}</code>`);
//                     } else if (text.match(/^`.+`$/) != null){
//                         codeT = text.match(/(?<=`).+(?=`)/);
//                         console.log(`<code>${codeT}</code>`);
//                     }
                    
                    if(after != null || before != null){


                        return `${before != null && before != undefined? paragraph(before[0]): ""}
                                ${componente}
                                ${after != null? paragraph(after[0]): ""}`;
                        
                    } else {
                        return `${componente}`;
                    }
                }


                // ----------------------------------ANCHOR--------------------
                const anchorTag = (text) => {  
                        
                    if (/\[.+\]\(.+\)/.test(text)){

                        let beforeAnchor, afterAnchor;
                        beforeAnchor = text.match(/.*?(?=\[.+\]\(.+\))/s);
                        afterAnchor = text.match(/(?<=\[.+\]\(.+\)).*/s);

                        let anchorMix = anchorTag(afterAnchor[0]);
                        let url = text.match(/(?<=\[.+\]\( ?).+?(?=\))/s);
                        url = /(https:\/\/|http:\/\/)/.test(url) ? url : "http://"+url[0];

                        return `${beforeAnchor[0]} <a href="${url}" target="_blank">${text.match(/(?<=\[).+?(?= ?\]\(.+\))/s)}</a> ${anchorMix}
                        `
                    } else {
                        return text;
                    }
                }
             //   /.*(?=(?<backticks>`+)[A-Za-z0-9_ ]*\k<backticks>)/s
                //---------------------------CODETAG---------------------------------
                const codeTag = (text) => {
                    let codeT, before, after, insideT;
                    if(text.match(/(?<backticks>`+)(\w|\s)+\k<backticks>(?!`+)/) != null){
                        console.log(true)
                        before = text.match(/.*?(?<backticks>`+)(?=(\w|\s)+\k<backticks>(\w|\s)*)/sm)[0].replace(/`+/, "");
                        console.log("hi")
                        after = text.match(/(?<=(\w|\s)*(?<backticks>`+)([^`].)+)\k<backticks>.*/sm) != null? text.match(/(?<=(\w|\s)*(?<backticks>`+)([^`].)+)\k<backticks>([^`].)*/s)[0].replace(/`+/, ""): "";
                        console.log("here after")
                        insideT = text.match(/(?<=(.[^`])*(?<backticks>`+))([^`].)+(?=\k<backticks>([^`].)*)/) != null ? text.match(/(?<=(\w|\s)*(?<backticks>`+))([^`].)+(?=\k<backticks>(.[^`])*)/)[0] : "";
                        
                        console.log(before, "BEFORE", after, "AFTER", insideT, "TEEEEEXT")
                        codeT = codeTag(after);
                        return `${before} <code>${insideT}</code> ${codeT}`;
                    } else {
                        return text;
                    }
                }


                
                textReturn = codeTag(anchorTag(paragraph(item)));
 
                console.log(textReturn);

        

                return textReturn;
            }
           //
           // THIS IS FOR MY OWN MARKED
           //
            // setText(convertText(inputText));

            setText(marked(inputText));
        }, [inputText]
    )
    
    useEffect(()=>{
        function defineHeight () {
            // We execute the same script as before
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--window-height', `${vh}px`);
            console.log(vh)
          }

        window.addEventListener('resize', defineHeight);

          return () => {
            window.removeEventListener('resize', defineHeight)
          }
    })

    return (
         <React.StrictMode>
        
            <Particles init={particlesInit} loaded={particlesLoaded} options={options} />
            <div id="editorBox" className={buttonEditor && !buttonPreview ? "editorMax" : !buttonEditor && !buttonPreview? "editorMin": "editorNone"}>
                <div className="topBox">
                    <p>Editor</p>
                    <button onClick={() => {setButtonEditor(!buttonEditor); setButtonPreview(false)}}>
                        <IoMdResize size={20} />
                    </button>
                </div>
                <textarea name="" 
                id="editor"
                onChange={e => setInputText(e.target.value)}
                value={inputText}
                >
                </textarea>
            </div>
            <div id="previewBox" className={buttonPreview && !buttonEditor? "previewMax" : !buttonEditor && !buttonPreview? "previewMin": "previewNone"}>
                <div className="topBox">
                    <p>Preview</p>
                    <button onClick={() => {setButtonPreview(!buttonPreview); setButtonEditor(false)}}>
                        <IoMdResize size={20} />
                    </button>
                </div>
                <div className="preview" dangerouslySetInnerHTML={{__html:text}}></div>
            </div>
      
         </React.StrictMode>
    )
}

export default App;