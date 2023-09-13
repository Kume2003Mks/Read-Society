
export default async function getdata() {

    try {
        const res = await fetch("https://example-data.draftbit.com/books?_limit=43");
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
