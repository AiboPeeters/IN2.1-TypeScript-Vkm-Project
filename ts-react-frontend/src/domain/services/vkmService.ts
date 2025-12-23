import { getAllVkms } from "../../infrastructure/api/vkmApi";

export class VkmService {
    async getVkms() {
        return await getAllVkms();
    }
}
