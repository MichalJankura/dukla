import Link from 'next/link';
import {
  formatOperatorAddress,
  formatRegisterEntry,
  operatorTaxIds,
  type Operator,
} from '@/features/legal/operator';
import { CookieSettingsButton } from '@/ui/consent/CookieSettingsButton';

interface OperatorInfoProps {
  operator: Operator;
  /** Classes for the legal links (Zásady cookies, Nastavenia cookies), so each variant can style them. */
  linkClassName: string;
  className?: string;
}

/** Legal block for footers: who runs the site (§ 4 of Act No. 22/2004 Coll.) and the cookie links. */
export function OperatorInfo({ operator, linkClassName, className }: OperatorInfoProps) {
  return (
    <div className={className}>
      <p className="m-0">
        Prevádzkovateľ: {operator.name}, {formatOperatorAddress(operator)} ·{' '}
        {operatorTaxIds(operator).join(' · ')}
        {operator.email && (
          <>
            {' · '}
            <a href={`mailto:${operator.email}`} className={linkClassName}>
              {operator.email}
            </a>
          </>
        )}
      </p>
      <p className="m-0">{formatRegisterEntry(operator)}</p>
      <p className="m-0 flex flex-wrap gap-x-6">
        <Link href="/cookies/" className={linkClassName}>
          Zásady cookies
        </Link>
        <CookieSettingsButton className={`cursor-pointer ${linkClassName}`} />
      </p>
    </div>
  );
}
