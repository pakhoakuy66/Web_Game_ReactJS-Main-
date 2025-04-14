import { useState } from "react";

export function Register() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    return (
        <div>
            <p>Alo đăng ký</p>
        </div>
    );
}
