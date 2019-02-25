import {InterfaceDeclaration} from "typescript";
import {VisitorOptions} from "../visitor-options";

/**
 * Visits the given InterfaceDeclaration.
 * @param {InterfaceDeclaration} currentNode
 * @param {VisitorOptions} options
 */
export function visitInterfaceDeclaration(currentNode: InterfaceDeclaration, {continuation}: VisitorOptions): void {
	// Check if any of the heritage clauses references the Node
	if (currentNode.heritageClauses != null) {
		for (const heritageClause of currentNode.heritageClauses) {
			for (const type of heritageClause.types) {
				continuation(type, currentNode);
			}
		}
	}

	// Check if any of the type parameters references the Node
	if (currentNode.typeParameters != null) {
		for (const typeParameter of currentNode.typeParameters) {
			continuation(typeParameter, currentNode);
		}
	}

	// Check if any of the members references the Node
	for (const member of currentNode.members) {
		continuation(member, currentNode);
	}
}
