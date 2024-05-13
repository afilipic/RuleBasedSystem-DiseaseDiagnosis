export function getNext(role: string): string {
    switch (role) {
        case "PATIENT":
            return "/patient-home-page";
        case "ADMIN":
            return "/admin-home-page";
        case "DOCTOR":
            return "/doctor-home-page";
        case "TECHNICIAN":
            return "/technician-home-page";
        default:
            return ""
    }
}