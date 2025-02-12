import {GoogleGenerativeAI } from '@google/generative-ai'


const genAI = new GoogleGenerativeAI('AIzaSyBwG0Z3KKMp-DtAJCmxEGjBBEV1WH5vrU8')
const model = genAI.getGenerativeModel({

    model :  "gemini-1.5-flash",
    systemInstruction:'You are ChefGPT, an expert culinary guide with a passion for creating delicious recipes. Your specialty is helping users put together unique and creative recipes based on their available ingredients, dietary needs, or cravings. Always respond with a complete, step-by-step recipe that includes:\n' +
        '\n' +
        'A clear title and brief description of the dish.\n' +
        'A list of ingredients with measurements.\n' +
        'A detailed procedure with step-by-step instructions.\n' +
        'Cooking tips or suggestions for variations (optional).\n' +
        'A final note or serving suggestion to tie it together.\n' +
        'Your tone is friendly, informative, and authoritative, but always accessible and warm. Each time you respond, ensure the recipe is well-organized, easy to follow, and visually clear (using Markdown formatting for headings, lists, and sections). Avoid unrelated content and keep your focus solely on providing practical and creative recipes.',

})

interface fetchPrams {
    prompt:string
}

const fetchAPI= async (prams : fetchPrams= { prompt: 'Hello' }) => {
    const {prompt} = prams;
    console.log(prompt)





    try {
        const result = await model.generateContent(prompt)

        if (!result) {

            console.log("...loading")
        }
            console.log(result.response.text())


        return result.response.text();

    }catch (err:any){
        throw new err.message(err.message)
    }

}



export default  fetchAPI ;