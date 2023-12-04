import {Discojs} from 'discojs';
import { Box, ChakraProvider, Heading, Text, Button, Input, Link, Flex, FormControl} from '@chakra-ui/react'
import { theme } from "../Theme";
import React from 'react';
import { useState } from 'react';

export default function App() {
  const [result, setResult] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [trackList, setTrackList] = useState("");

  const get = (e) => {
    e.preventDefault();
    let catno = document.getElementById("catno_form");

    console.log(catno.value);
    const client = new Discojs({
      userToken: "TjGHBHwkCBHRcOeoyJKoVaVFpOwtkGXwffmXaLJM",
    });

    client
      .searchRelease(catno.value, "catno")
      .then(data => data.results[0] ? fetch(data.results[0].resource_url):setResult(""))
      .then(res => res.json())
      .then(json => setResult(json));

    console.log(result);
    console.log(trackList);

    if(result === ""){
      console.log("NOT FOUND!");
    }

  }
  return (
    <ChakraProvider theme={theme}>
      <Heading m={2}>Vinyl Finder</Heading>
      レコード盤やCDなどの型番からアルバム情報などを検索できます
      <FormControl className="searchForm" m={2} borderWidth='1.5px'  borderRadius='lg'  borderColor='black' width='auto'>
        <label>型番を入力してください 例:SVWC-70613<br></br>
          <Input type="text" id="catno_form" width="auto"/>
          <Button onClick={get}>検索</Button>
        </label>
      </FormControl>
      <Box className="resultField" m={2} borderWidth='1.5px'  borderRadius='lg'  borderColor='black' minH="660">
        <Text as='b'>検索結果</Text><br></br>
        {result === "" && (<Text color='tomato' as='b'>NOT FOUND</Text>)}
        {result &&
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
            </Flex>
          )
        }
      </Box>
    </ChakraProvider>
  );
}