import React from 'react'

interface IProps {
    message: string,
    isUser: boolean,
    id:number | string

}

export const MessageBubble = (params: IProps) => {
    function cleanText(input: string): string {

        const cleaned = input
            // Convert markdown italics to <em>
            .replace(/\*([^*]+)\*/g, '<em>$1</em>')
            //convert the Hash + to subtitles
            .replace(/##+ (.+)/g, '<strong>$1</strong>')

            // Convert markdown bold to <strong>
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            // Convert numbered lists
            .replace(/(\d+\.\s+)(.+)/g, '<li>$2</li>')
            // Convert dashed lists
            .replace(/-\s+(.+)/g, '<li>$1</li>')
            // Preserve paragraphs
            .replace(/\n\n/g, '</p><p>')
            // Convert single newlines to line breaks
            .replace(/\n/g, '<br/>');


        return `<div class="message-content">
            ${cleaned}
        </div>`;
    }

    const formattedHTML = cleanText(params.message);
    console.log(formattedHTML)

    return (
        <div key={params.id}
             className={`min-w-[30rem] max-w-[70%] ${params.isUser ? 'bg-cyan-600' : ''} rounded-2xl shadow-lg p-4 mb-4`}>
            <div className={`flex ${params.isUser ? 'justify-end' : 'justify-start'} items-start gap-3`}>
                {!params.isUser && (
                    <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">AI</span>
                    </div>
                )}
                <div
                    className={`prose max-w-none ${params.isUser ? 'text-white' : 'text-gray-100'}`}
                    dangerouslySetInnerHTML={{ __html: formattedHTML }}
                />
            </div>
        </div>
    )
}
