import Script from 'next/script';

type JsonLd = object | object[];

type StructuredDataProps = {
	id: string;
	data: JsonLd;
};

export default function StructuredData({ id, data }: StructuredDataProps) {
	return (
		<Script
			id={id}
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}
