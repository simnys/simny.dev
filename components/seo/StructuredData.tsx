type JsonLd = object | object[];

type StructuredDataProps = {
	id: string;
	data: JsonLd;
};

/**
 * Renders JSON-LD structured data as a static server-side script tag.
 * Using a plain <script> (not next/script) ensures the markup is present
 * in the initial HTML response, making it reliably parseable by all crawlers.
 */
export default function StructuredData({ id, data }: StructuredDataProps) {
	return (
		<script
			id={id}
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}
