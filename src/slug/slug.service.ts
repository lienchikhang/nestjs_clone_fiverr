import { Injectable } from '@nestjs/common';

@Injectable()
export class SlugService {
    convert(text: string): string {
        return text
            .toLowerCase()
            .normalize("NFD") // Chuẩn hóa Unicode
            .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các ký tự dấu thanh
            .replace(/[^\w\s-]/g, "") // Loại bỏ các ký tự không phải chữ cái, số, hoặc dấu gạch ngang
            .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
            .replace(/-+/g, "-") // Loại bỏ các dấu gạch ngang liên tiếp
            .trim(); // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
    }
}
