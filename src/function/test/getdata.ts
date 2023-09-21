export default async function getdata() {
    try {
        // ตรวจสอบว่าข้อมูลมีอยู่ใน Session Storage หรือไม่
        const storedData = sessionStorage.getItem('myData');

        if (storedData) {
            // ถ้ามีข้อมูลใน Session Storage ให้ใช้ข้อมูลจากนั้น
            const data = JSON.parse(storedData);
            console.log("Data from Session Storage:", data);
            return data;
        } else {
            // ถ้าไม่มีข้อมูลใน Session Storage ให้ดึงข้อมูลจาก API
            const res = await fetch("https://example-data.draftbit.com/books?_limit=43");
            const data = await res.json();
            console.log("Data from API:", data);

            // เก็บข้อมูลใน Session Storage
            sessionStorage.setItem('myData', JSON.stringify(data));

            return data;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
