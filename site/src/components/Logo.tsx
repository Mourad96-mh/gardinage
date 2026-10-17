/* eslint-disable @next/next/no-img-element */
/** Logo du client (écusson détouré par scripts/logo.mjs) + nom en toutes lettres pour la lisibilité. */
export function Logo({ large = false, withText = true }: { large?: boolean; withText?: boolean }) {
  return (
    <span className={`logo${large ? ' logo--lg' : ''}`}>
      <img src="/brand/logo-rsp.png" width={251} height={240} alt="" className="logo__img" />
      {withText ? (
        <span className="logo__text">
          <strong>Rhône Sécu</strong>
          <small>Protection</small>
        </span>
      ) : null}
    </span>
  );
}
