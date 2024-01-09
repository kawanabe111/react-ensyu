import {Discojs} from 'discojs';
import { Box, ChakraProvider, Heading, Text, Button, Input, Link, Flex, FormControl} from '@chakra-ui/react'
import { theme } from "../Theme";
import React from 'react';
import { useState } from 'react';

export default function App() {
  const [result, setResult] = useState("");
  const [releases, setReleases] = useState("");


  function sleep(waitMsec) {
    var startMsec = new Date();
  
    // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
    while (new Date() - startMsec < waitMsec);
  }
  

  function get(){
    let keyWord = document.getElementById("keyWord_form").value;

    console.log(keyWord);
    const client = new Discojs({
      userToken: "TjGHBHwkCBHRcOeoyJKoVaVFpOwtkGXwffmXaLJM",
    });

    client
      .searchRelease(keyWord)
      .then(function(data){
        console.log(data);
        (data.results.length !== 0 ? fetch(data.results[0].resource_url):setResult("404"))
        .then(res => res.json())
        .then(function(json){
          client.searchRelease(json.artists[0].name, "artist")
          .then(data => setReleases(data.results));
          setResult(json);
          console.log(json);
        });

        console.log(releases);
        if(result === ""){
          console.log("NOT FOUND!");
        }
      });
  }

  return (
    <ChakraProvider theme={theme}>
      <Heading m={2}>Vinyl Finder</Heading>
      アルバム情報を検索できます
      <FormControl className="searchForm" m={2} borderWidth='1.5px'  borderRadius='lg'  borderColor='black' width='auto'>
        <label>アルバム名もしくは型番を入力してください 例:SVWC-70613<br></br>
          <Input type="text" id="keyWord_form" width="auto"/>
          <Button onClick={get}>検索</Button>
        </label>
      </FormControl>
      <Box className="resultField" m={2} borderWidth='1.5px'  borderRadius='lg'  borderColor='black' minH="660">
        <Text as='b'>検索結果</Text><br></br>
        {result === "404" && (<Text color='tomato' as='b'>NOT FOUND</Text>)}
        {(result !== "404" && result && releases) &&
          (
            <Flex>
              <Box className="info" m={2} borderWidth='1.5px'  borderRadius='lg' borderColor='black' height='auto'>
                <Flex>
                <Box className="details" width="60%">
                  <strong>アーティスト名:</strong>{result.artists[0].name}<br></br>
                  <strong>タイトル:</strong>{result.title}<br></br>
                  <strong>発売年:</strong>{result.year}年<br></br>
                  <strong>発売国:</strong>{result.country}<br></br>
                  <strong>レーベル:</strong>{result.labels[0].name}<br></br>
                  <strong>フォーマット:</strong>{result.formats[0].name}<br></br>
                </Box>
                <Box className="songs" m={2} borderWidth='1.5px'  borderRadius='lg'  borderColor='black' width="40%">
                  <Text as='b'>収録曲</Text>
                  <ul>
                    {result.tracklist.map( t =>
                      <ul key={t.title}>・{t.title}({t.position})</ul>
                    )}
                  </ul>
                </Box>
                </Flex>
                <Link href={result.uri}><strong>Discogsでのページを開く</strong></Link><br></br>
              </Box>
              <Box className="releases" m={2} borderWidth='1.5px'  borderRadius='lg'  borderColor='black' width="40%">
                  <Text as='b'>他のリリース</Text>
                  <ul>
                    {releases.map( r =>
                      // <ul key={t.uri}>・{t.title}</ul>
                      <ul key={r.uri}><Link href={"https://www.discogs.com/ja/release"+r.uri}>{r.title}</Link></ul>
                    )}
                  </ul>
                </Box>
            </Flex>
          )
        }
      </Box>
    </ChakraProvider>
  );
}