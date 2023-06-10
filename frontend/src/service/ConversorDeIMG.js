export const Conversor = async (url) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const file = new File([blob], 'user.jpg', { type: 'image/jpeg' })
        return file
    } catch (error) {
        console.console('Erro ao carregar a imagem');
    }
}