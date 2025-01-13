export async function getUserIdFromToken() {
    // Verifica se o código está sendo executado no lado do cliente
    if (typeof document !== "undefined") {
        // Obtém os cookies
        const cookies = document.cookie.split("; ");
        // Encontra o cookie chamado "userToken"
        const userTokenCookie = cookies.find((cookie) => cookie.startsWith("userToken="));
        
        if (userTokenCookie) {
            // Extrai o token do cookie
            const token = userTokenCookie.split("=")[1];
            if (token) {
                const parts = token.split(".");
                if (parts.length === 3) {
                    try {
                        // Decodifica a parte do payload do token que está em base64
                        let decodedPayloadBase64 = atob(parts[1]);

                        // Remove espaços e quebras de linha do payload
                        decodedPayloadBase64 = decodedPayloadBase64.trim();
                        decodedPayloadBase64 = decodedPayloadBase64.replace(/[\n\r]+/g, "");

                        // Garantir que o JSON está bem formado (encontrar último colchete)
                        const lastCurlyBrace = decodedPayloadBase64.lastIndexOf("}");
                        if (lastCurlyBrace !== -1) {
                            decodedPayloadBase64 = decodedPayloadBase64.substring(0, lastCurlyBrace + 1);
                        }

                        // Fazer o parse do payload decodificado
                        const decodedPayload = JSON.parse(decodedPayloadBase64);

                        // Retornar o ID do usuário
                        return decodedPayload._id;
                    } catch (error) {
                        console.error("Erro ao decodificar ou fazer o parse do payload do token:", error);
                        return null;
                    }
                }
            }
        }
    }
    return null;
}
