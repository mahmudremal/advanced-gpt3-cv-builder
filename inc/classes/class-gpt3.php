<?php
/**
 * The OpenAI ChatGPT-3.
 * https://www.npmjs.com/package/openai
 * https://www.npmjs.com/package/chatgpt
 * 
 * @package AdvancedGPT3CVbuilder
 */
namespace ADVANCEDGPT3CVBUILDER_PROJECT\Inc;
use ADVANCEDGPT3CVBUILDER_PROJECT\Inc\Traits\Singleton;

class Gpt3 {
	use Singleton;
	private $base;
	private $apikey;
	protected function __construct() {
    $this->base = [];
    $this->apikey = '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';
		$this->setup_hooks();
	}
	protected function setup_hooks() {
	}
	public function generate_cv( $args = [] ) {
		$args = wp_parse_args( $args, [
			'first_name' => '',
			'last_name' => '',
			'birth_date' => '',
			'edu_qualifications' => '',
			'work_experience' => '',
			'address' => '',
			'phone' => '',
			'email' => '',
			'father_name' => '',
			'mother_name'
		] );
		extract( $args );
		$engine = "davinci";
		$prompt = "Generate a CV for $first_name $last_name. \n\n Personal Information:\nName: $first_name $last_name\nDate of Birth: $birth_date\nAddress: $address\nPhone: $phone\nEmail: $email\n\nEducation Qualifications:\n- " . implode("\n- ", $edu_qualifications) . "\n\nWork Experience:\n- " . implode("\n- ", $work_experience) . "\n\nFather's Name: $father_name\nMother's Name: $mother_name\n\nPlease generate a CV for me with the following details:";
	
		$data = array(
			"prompt" => $prompt,
			"temperature" => 0.7,
			"max_tokens" => 1024,
			"stop" => "\n\n"
		);
	
		$ch = curl_init();
	
		curl_setopt_array($ch, array(
			CURLOPT_URL => "https://api.openai.com/v1/engines/$engine/completions",
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "POST",
			CURLOPT_POSTFIELDS => json_encode($data),
			CURLOPT_HTTPHEADER => array(
				"Authorization: Bearer {$this->apikey}",
				"Content-Type: application/json"
			),
		));
	
		$response = curl_exec($ch);
		$err = curl_error($ch);
	
		curl_close($ch);
	
		if ($err) {
			echo "cURL Error #:" . $err;
		} else {
			return $response;
		}
	}
	public function example_request() {
		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => 'https://api.openai.com/v1/engines/davinci-codex/completions',
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'POST',
			CURLOPT_POSTFIELDS => '{"prompt": "Hello, GPT-3!", "max_tokens": 5}',
			CURLOPT_HTTPHEADER => array(
				'Content-Type: application/json',
				"Authorization: Bearer {$this->apikey}"
			),
		));

		$response = curl_exec($curl);
		$err = curl_error($curl);

		curl_close($curl);

		if ($err) {
			echo 'cURL Error #:' . $err;
		} else {
			echo $response;
		}

	}
  
}
