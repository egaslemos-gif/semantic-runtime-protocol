/**
 * CI Governance Adapter
 * Translates the graph into a pass/fail assertion log for Github Actions.
 */
export class CiGovernanceAdapter {

    public static adapt(rawPayload: any): boolean {
        // CI Bots only care if a Strict rule was violated during a PR check.
        const warnings = rawPayload.governance_warnings || [];

        if (warnings.length > 0) {
            console.error(`[CI GOVERNANCE FAILED] Strict constraints violated:\n${warnings.join('\n')}`);
            return false;
        }

        console.log(`[CI GOVERNANCE PASSED] Target ${rawPayload.target} is compliant.`);
        return true;
    }
}
