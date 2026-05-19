<script lang="ts">
	type Variant = 'care' | 'toolkit' | 'community';

	let { variant = 'care', class: className = '' }: { variant?: Variant; class?: string } = $props();
</script>

{#if variant === 'care'}
	<svg
		viewBox="0 0 430 320"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class={className}
		aria-hidden="true"
	>
		<path d="M64 286H365" stroke="#F6ECD9" stroke-width="6" stroke-linecap="round" />
		<path d="M128 178H306V246H128z" fill="#D99113" />
		<path d="M142 197c44 14 96 14 151 0" stroke="#F6ECD9" stroke-width="6" stroke-linecap="round" />
		<path d="M154 127h126v55H154z" fill="#F6ECD9" />
		<path d="M174 144h42M174 161h76" stroke="#BBCBC4" stroke-width="6" stroke-linecap="round" />
		<path d="M276 116c-24-11-42 5-49 34l45 20c20-18 25-39 4-54Z" fill="#2A6268" />
		<path d="M259 116c3-25 40-28 48-4 6 21-21 37-41 23" fill="#8F3F2A" />
		<path d="M289 91c20 3 30 17 27 41-17-2-31-10-41-26" fill="#161817" />
		<path d="M289 91c-8 17-22 26-41 27 5-19 18-29 41-27Z" fill="#161817" />
		<path d="M263 157c31 15 52 42 63 80l-50 16c-11-36-28-58-52-66l39-30Z" fill="#FF4A12" />
		<path d="M283 205c10 14 23 23 40 27" stroke="#F6D66D" stroke-width="5" stroke-linecap="round" />
		<path d="M303 238l44 26-18 22-55-35 29-13Z" fill="#111111" />
		<path d="M73 156c16-36 61-39 82-6l-31 25c-13-14-26-12-39 8l-12-27Z" fill="#4C7FF0" />
		<path d="M91 128c-14-28 22-49 39-25 15 22-9 45-35 34" fill="#F49BC6" />
		<path d="M92 103c18-21 45-15 50 10-21-1-38 5-50 20-8-10-8-20 0-30Z" fill="#FF4A12" />
		<path d="M82 178c32-25 68-26 108-3l-34 78H82V178Z" fill="#0F4F46" />
		<path d="M115 207c19 10 38 10 58 0" stroke="#F6ECD9" stroke-width="5" stroke-linecap="round" />
		<path d="M89 252l-26 26 24 14 35-35-33-5Z" fill="#111111" />
		<path d="M153 251l31 29-20 17-44-39 33-7Z" fill="#111111" />
		<path d="M181 183c17-11 36-11 55 1" stroke="#F6ECD9" stroke-width="14" stroke-linecap="round" />
		<rect x="198" y="155" width="54" height="38" rx="7" fill="#F6D66D" />
		<path d="M210 171h29" stroke="#6F231E" stroke-width="5" stroke-linecap="round" />
		<path d="M61 78l17-6 6-18 7 18 18 6-18 7-7 18-6-18-17-7Z" fill="#F6D66D" />
		<path
			d="M326 95c26-22 54-13 59 17 4 27-14 49-49 61"
			stroke="#E2A15F"
			stroke-width="5"
			stroke-linecap="round"
		/>
	</svg>
{:else if variant === 'toolkit'}
	<svg
		viewBox="0 0 430 320"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class={className}
		aria-hidden="true"
	>
		<path d="M54 286H374" stroke="#F6ECD9" stroke-width="6" stroke-linecap="round" />
		<path d="M129 220h91v66h-91z" fill="#D99113" />
		<path d="M221 188h91v98h-91z" fill="#FF4A12" />
		<path d="M221 226h91" stroke="#F6ECD9" stroke-width="4" />
		<path d="M313 207h60v79h-60z" fill="#4C7FF0" />
		<path d="M326 227h35M326 246h35" stroke="#F6ECD9" stroke-width="5" stroke-linecap="round" />
		<path d="M96 248h33v38H96z" fill="#4C7FF0" />
		<path
			d="M109 259l8 14M121 257l-8 16"
			stroke="#8EBB8F"
			stroke-width="3"
			stroke-linecap="round"
		/>
		<path d="M141 91c29-35 86-20 91 26 5 42-41 73-82 48-31-19-34-49-9-74Z" fill="#FF4A12" />
		<path d="M156 79c18-25 61-19 74 5-34-1-62 9-84 30-8-14-5-26 10-35Z" fill="#161817" />
		<path d="M181 84c-8 11-18 17-30 19" stroke="#F6D66D" stroke-width="5" stroke-linecap="round" />
		<path d="M146 152c30 6 52 24 66 55l-58 19c-12-28-27-45-46-50l38-24Z" fill="#FF4A12" />
		<path d="M116 176c-17 24-37 39-62 45l-14-38c28-5 49-18 64-39l12 32Z" fill="#F49BC6" />
		<path d="M91 172c15-11 31-14 48-10" stroke="#F6ECD9" stroke-width="5" stroke-linecap="round" />
		<path d="M188 196l-8 58h-54l26-70 36 12Z" fill="#0F4F46" />
		<path d="M178 251l31 30-21 16-45-41 35-5Z" fill="#111111" />
		<path d="M225 113h87v66h-87z" fill="#F6ECD9" />
		<path d="M242 134h40M242 152h54" stroke="#BBCBC4" stroke-width="6" stroke-linecap="round" />
		<path d="M298 91l53 28-31 57-53-28z" fill="#1F35CC" />
		<path d="M310 121l9 12 23-25" stroke="#F6ECD9" stroke-width="7" stroke-linecap="round" />
		<path d="M206 122c24-19 55-18 91 2" stroke="#8F3F2A" stroke-width="11" stroke-linecap="round" />
		<path d="M208 157c25 6 49 3 71-11" stroke="#F6ECD9" stroke-width="5" stroke-linecap="round" />
		<path d="M251 204c14 10 28 13 43 8" stroke="#F6D66D" stroke-width="5" stroke-linecap="round" />
		<path d="M70 105c-24 15-29 40-14 75" stroke="#E2A15F" stroke-width="5" stroke-linecap="round" />
	</svg>
{:else}
	<svg
		viewBox="0 0 470 320"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class={className}
		aria-hidden="true"
	>
		<path d="M52 286H417" stroke="#F6ECD9" stroke-width="6" stroke-linecap="round" />
		<path d="M101 147h127v88H101z" fill="#D99113" />
		<path d="M127 164h35M127 185h72" stroke="#F6ECD9" stroke-width="7" stroke-linecap="round" />
		<path d="M254 118h103v117H254z" fill="#F6ECD9" />
		<path d="M276 141h56M276 164h39" stroke="#BBCBC4" stroke-width="7" stroke-linecap="round" />
		<path d="M65 174c9-42 60-50 85-17l-32 30c-17-16-30-12-42 12l-11-25Z" fill="#8EBB8F" />
		<path d="M86 128c-12-31 32-50 48-23 13 22-14 44-42 31" fill="#F49BC6" />
		<path d="M86 98c25-20 54-12 58 18-22-2-39 5-53 20-11-12-13-25-5-38Z" fill="#FF4A12" />
		<path d="M72 188c26-18 58-19 94-1l-17 99H93l-21-98Z" fill="#0F4F46" />
		<path d="M103 216c18 9 35 9 52-1" stroke="#F6ECD9" stroke-width="5" stroke-linecap="round" />
		<path d="M91 282l-36 11 14 21 52-18-30-14Z" fill="#111111" />
		<path d="M148 281l35 18-14 20-50-26 29-12Z" fill="#111111" />
		<path d="M197 132c18-36 69-30 78 9 8 35-27 67-67 51-27-11-31-37-11-60Z" fill="#FF4A12" />
		<path d="M215 105c22-17 51-8 57 16-25-1-44 8-58 27-15-13-15-27 1-43Z" fill="#161817" />
		<path d="M237 106c-5 10-13 17-24 20" stroke="#F6D66D" stroke-width="5" stroke-linecap="round" />
		<path d="M195 182c29 19 51 48 65 88l-55 13c-10-31-28-54-52-69l42-32Z" fill="#FF4A12" />
		<path d="M210 224c15 11 31 15 49 12" stroke="#F6ECD9" stroke-width="5" stroke-linecap="round" />
		<path d="M235 280l31 22-17 18-48-34 34-6Z" fill="#111111" />
		<path d="M326 132c16-38 68-36 82 1 11 31-14 61-52 58-32-2-44-27-30-59Z" fill="#4C7FF0" />
		<path d="M345 98c23-16 55-5 61 23-25-2-45 5-60 22-13-15-13-30-1-45Z" fill="#161817" />
		<path d="M371 98c-6 10-15 17-26 20" stroke="#F6D66D" stroke-width="5" stroke-linecap="round" />
		<path d="M333 183c34 11 55 39 64 84l-52 14c-7-36-20-58-41-66l29-32Z" fill="#111111" />
		<path d="M352 222c13 10 27 13 42 8" stroke="#4C7FF0" stroke-width="5" stroke-linecap="round" />
		<path d="M376 278l36 18-15 21-52-28 31-11Z" fill="#111111" />
		<path
			d="M168 164c42 23 91 24 147 3"
			stroke="#F6ECD9"
			stroke-width="13"
			stroke-linecap="round"
		/>
		<path d="M319 226c28-21 61-24 98-8" stroke="#E2A15F" stroke-width="5" stroke-linecap="round" />
		<path d="M62 87l18-7 7-18 7 18 18 7-18 7-7 18-7-18-18-7Z" fill="#F6D66D" />
	</svg>
{/if}
