import { ValidateIcons } from "../ui/Icons";

export default function PasswordRequirement({ ok, label } : { ok : boolean, label : string }) {
    const Icon = ok ? ValidateIcons.check : ValidateIcons.xMark;

    return <li className={`
        flex
        items-center
        gap-2
        transition-colors
        ${ok? 'text-green-500' : 'text-foreground/40'}
    `}>
        <Icon size={14} />
        { label }
    </li>
}