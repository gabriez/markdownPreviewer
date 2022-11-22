import React, {useState, useEffect} from "react"

       
                     

const App = () => {
    const [text, setText] = useState([]);
    const [inputText, setInputText] = useState("");  

    const convertTextp = (item) => {
        let textReturn; 
        
        const paragraphito = (text) => {
            if (text.match(/^(\r\n|\n|\r)(###)$/m) != null) {
                console.log("It Works!")
            }

        }

    }

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
                    if(text.match(/(?<backticks>`+)([^`].[^`])+\k<backticks>(?!`+)/) != null){
                        console.log(true)
                        before = text.match(/.*?(?<backticks>`+)(?=([^`].[^`])+\k<backticks>(\w|\s)*)/sm)[0].replace(/`+/, "");
                        console.log("hi")
                        after = text.match(/(?<=(\w|\s)*(?<backticks>`+).+)\k<backticks>.*/sm) != null? text.match(/(?<=(\w|\s)*(?<backticks>`+)([^`].[^`])+)\k<backticks>([^`].)*/s)[0].replace(/`+/, ""): "";
                        console.log("here after")
                        insideT = text.match(/(?<=(.[^`])*(?<backticks>`+))([^`].[^`])+(?=\k<backticks>([^`].)*)/) != null ? text.match(/(?<=(\w|\s)*(?<backticks>`+))([^`].)+(?=\k<backticks>(.[^`])*)/)[0] : "";
                        
                        console.log(before, "BEFORE", after, "AFTER", text.match(/(?<=(\w|\s)*(?<backticks>`+))([^`].)+(?=\k<backticks>([^`].)*)/), "TEEEEEXT")
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
           
            setText(convertText(inputText));


           /* 
            setText(lineText.map(
                item => {
                    let textReturn;


                    // Code tag selection

                    const codeTag = (text) => {
                        let codeT;
                        if(text.match(/```.+```/) != null){
                            codeT = text.match(/(?<=```).+(?=```)/);
                            console.log(`<pre><code>${codeT}</code></pre>`);
                        } else if(text.match(/``.+``/) != null){
                            codeT = text.match(/(?<=``).+(?=``)/);
                            console.log(`<code>${codeT}</code>`);
                        } else if (text.match(/^`.+`$/) != null){
                            codeT = text.match(/(?<=`).+(?=`)/);
                            console.log(`<code>${codeT}</code>`);
                        } else {
                            return; 
                        }
                    }
                    codeTag(item);

                    // Anchor tag selection

                    const anchorTag = (text) => {  
                        
                        if (/\[.+\]\(.+\)/.test(text)){
                            
---------------------- COMENTAR---------------
                            let beforeAnchor, afterAnchor;
                            beforeAnchor = text.match(/.*?(?=\[.+\]\(.+\))/);
                            afterAnchor = text.match(/(?<= *\[.+\]\(.+\) *).*//*);
                           
                            let anchorMix = anchorTag(afterAnchor[0]);
                            // console.log(anchorMix, count)

                            let url = text.match(/(?<=\[.+\]\( ?).+?(?=\))/);
                            
                            url = /(https:\/\/|http:\/\/)/.test(url) ? url : "http://"+url[0];

                            return `<span>${beforeAnchor[0]}</span>
                            <a href="${url}"
                            target="_blank">${text.match(/(?<=\[).+?(?= ?\]\(.+\))/)}</a>
                            ${anchorMix}
                            `
                        } else {

                            return text;
                        }
                    }

                    textReturn = anchorTag(item);
                    console.log(textReturn)

                    // Headings selection
                    if(/#{4,}/.test(textReturn)){
                        textReturn = textReturn;
                    } 
                    else if (/#{3}/.test(textReturn)) {
                       ---------------------- COMENTAR---------------
                        let newText = textReturn.match(/(?<=(<span>)?#{3}).*//*s) === null ? [""] : textReturn.match(/(?<=(<span>)?#{3}).*//*s);
                        textReturn = textReturn.match(/<\/span>.*<a href=/s) === null? `<h3>${newText}</h3>`:`<h3><span>${newText}</h3>`;
                           
                    }              
                    else if (/#{2}/.test(textReturn)) {
                        
                        let newText = textReturn.match(/(?<=(<span>)?##).*//*s) === null ? [""] : textReturn.match(/(?<=(<span>)?##).*//*s);
                        textReturn = textReturn.match(/<\/span>.*<a href=/s) === null? `<h2>${newText}</h2>`:`<h2><span>${newText}</h2>`;
                    } 

                    else if (/#/.test(textReturn)){
                       
                        let newText = textReturn.match(/(?<=(<span>)?#).*//*s) === null ? [""] : textReturn.match(/(?<=(<span>)?#).*//*s);
                        textReturn = textReturn.match(/<\/span>.*<a href=/s) === null? `<h1>${newText[0]}</h1>` :  `<h1><span>${newText[0]}</h1>`;
                        
                    } 
                    
                    console.log(textReturn)
                    return textReturn;
                }
            ))

         */
        }, [inputText]
    )
   
    return (
        <React.StrictMode>
            <div>
                <textarea name="" id="editor" cols="30" rows="10" onChange={e => setInputText(e.target.value)}></textarea>
            </div>
            <div dangerouslySetInnerHTML={{__html:text}}  id="preview">
                
            </div>
        </React.StrictMode>
    )
}

export default App;