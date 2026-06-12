import { ValidatedNode, SemanticNode, CanonicalId, OwnershipDomain, NodeStatus, NodeType, ConstraintLevel } from '../types/canonical';

/**
 * Semantic Access Layer
 * Provides O(1) indexed access to nodes without performing any heuristic logic.
 * Adheres to INDEX_FREEZE_PROTOCOL.md
 */
export class SemanticRegistry {
    private readonly rootStore: Map<CanonicalId, SemanticNode> = new Map();
    
    // Immutable Synchronous Indices
    private readonly ownershipIndex: Map<OwnershipDomain, Set<CanonicalId>> = new Map();
    private readonly statusIndex: Map<NodeStatus, Set<CanonicalId>> = new Map();
    private readonly typeIndex: Map<NodeType, Set<CanonicalId>> = new Map();
    private readonly constraintIndex: Map<ConstraintLevel, Set<CanonicalId>> = new Map();

    private isFrozen = false;

    /**
     * Injects a ValidatedNode into the Semantic Access Layer.
     * Synchronously populates all O(1) indices.
     */
    public register(node: ValidatedNode): void {
        if (this.isFrozen) {
            throw new TypeError('[FATAL: SYSTEM] Cannot register nodes after the Registry Index Freeze Protocol has been executed.');
        }

        const id = node.id;
        
        if (this.rootStore.has(id)) {
            throw new Error(`[FATAL: STRUCTURAL] Duplicate Canonical ID detected: ${id}`);
        }

        // The actual semantic integrity rules are checked by semantic.ts BEFORE calling register.
        // This registry just holds the memory safely.
        const semanticNode = node as SemanticNode;
        this.rootStore.set(id, semanticNode);

        // Synchronously populate Governance Index
        if (node.frontmatter.ownership_domain) {
            const domain = node.frontmatter.ownership_domain as OwnershipDomain;
            if (!this.ownershipIndex.has(domain)) {
                this.ownershipIndex.set(domain, new Set());
            }
            this.ownershipIndex.get(domain)!.add(id);
        }

        // Synchronously populate State Index
        const status = node.frontmatter.status as NodeStatus;
        if (!this.statusIndex.has(status)) {
            this.statusIndex.set(status, new Set());
        }
        this.statusIndex.get(status)!.add(id);

        // Synchronously populate Topology Index
        const type = node.frontmatter.node_type as NodeType;
        if (!this.typeIndex.has(type)) {
            this.typeIndex.set(type, new Set());
        }
        this.typeIndex.get(type)!.add(id);

        // Synchronously populate Constraint Index
        if (node.frontmatter.constraint_level) {
            const constraint = node.frontmatter.constraint_level as ConstraintLevel;
            if (!this.constraintIndex.has(constraint)) {
                this.constraintIndex.set(constraint, new Set());
            }
            this.constraintIndex.get(constraint)!.add(id);
        }
    }

    /**
     * Executes the Index Freeze Protocol.
     * Protects the Traversal Engine from Hidden Index Desynchronization.
     */
    public freezeIndices(): void {
        this.isFrozen = true;
        Object.freeze(this.rootStore);
        Object.freeze(this.ownershipIndex);
        Object.freeze(this.statusIndex);
        Object.freeze(this.typeIndex);
        Object.freeze(this.constraintIndex);
    }

    // O(1) Accessors
    public get(id: CanonicalId): SemanticNode | undefined {
        return this.rootStore.get(id);
    }

    public getAllNodes(): SemanticNode[] {
        return Array.from(this.rootStore.values());
    }

    public getByOwnership(domain: OwnershipDomain): CanonicalId[] {
        return Array.from(this.ownershipIndex.get(domain) || []);
    }

    public getByStatus(status: NodeStatus): CanonicalId[] {
        return Array.from(this.statusIndex.get(status) || []);
    }

    public getByType(type: NodeType): CanonicalId[] {
        return Array.from(this.typeIndex.get(type) || []);
    }
}
